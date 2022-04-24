import ERC20 from '@components/ERC20'
import { useIsMounted } from '@libs/hooks/useIsMounted'
import Head from 'next/head'
import { useAccount, useConnect } from 'wagmi'

export const Home = (): JSX.Element => {
  const isMounted = useIsMounted()

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })
  const [
    { data: connectData, error: connectError, loading: loadingConenctor },
    connect,
  ] = useConnect()

  return (
    <div className="flex flex-col w-full h-screen">
      <Head>
        <title>Create Next App with Amagi:DDmxh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-around items-center">
        <div className="bg-red-200 p-4">LOGO</div>

        <nav className="">
          <a href="#link-a" target="_blank" rel="noopener noreferrer">
            link a
          </a>
          <a href="#link-a" target="_blank" rel="noopener noreferrer">
            link a
          </a>
          <a href="#link-a" target="_blank" rel="noopener noreferrer">
            link a
          </a>
          <a href="#link-a" target="_blank" rel="noopener noreferrer">
            link a
          </a>
        </nav>

        {accountData ? (
          <div className="text-black">
            {/* TODO */}
            <img src={accountData.ens?.avatar ?? ''} alt="ENS Avatar" />
            <div className="text-2xl">
              {accountData.ens?.name
                ? `${accountData.ens?.name} (${accountData.address})`
                : accountData.address}
            </div>
            {/* TODO */}
            <div className="text-sm">
              Connected to {accountData?.connector?.name}
            </div>
            <button
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={disconnect}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="flex gap-2 p-4">
            {/* // TODO */}
            {connectData.connectors.map((connector) => (
              <button
                disabled={isMounted && !connector.ready}
                key={connector.id}
                onClick={() => {
                  connect(connector)
                }}
              >
                {connector.id === 'injected'
                  ? isMounted
                    ? connector.name
                    : connector.id
                  : connector.name}
                {isMounted && !connector.ready && ' (unsupported)'}
                {loadingConenctor && connector.name === connector?.name && '…'}
              </button>
            ))}
            {connectError && (
              <div>{connectError?.message ?? 'Failed to connect'}</div>
            )}
          </div>
        )}
      </header>

      <main className="h-full bg-slate-700">
        <ERC20 />
      </main>
    </div>
  )
}

export default Home
