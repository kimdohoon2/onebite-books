import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err: unknown) {
    // unknown 타입 사용
    if (err instanceof Error) {
      // err가 Error 타입일 때만 처리
      console.error(err.message);
    }
    res.status(500).send("Revalidation Failed");
  }
}
