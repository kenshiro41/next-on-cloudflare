import { NextPage } from 'next';

export const runtime = 'edge';

const Page: NextPage = async () => {
  const apiUrl = `${process.env.API_BASE_URL}/api/time`;
  const responses = await Promise.all([
    fetch(apiUrl, { cache: 'force-cache' }),
    fetch(apiUrl, { cache: 'no-cache' }),
  ]);
  const [forceCache, noCache] = await Promise.all(
    responses.map((x) => x.json())
  );

  const data = [
    {
      name: 'force-cache',
      data: forceCache,
    },
    {
      name: 'no-cache',
      data: noCache,
    },
  ];

  return (
    <div className='my-10 text-center'>
      <ul>
        {data.map((x) => (
          <li key={x.name}>{JSON.stringify(x)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
