export const runtime = 'edge';

export const GET = async (req: Request) => {
  return Response.json({ date: new Date() });
};
