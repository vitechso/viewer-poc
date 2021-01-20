export default async (req, res) => {
  const { user } = await req.body;

  try {
    return res.status(200).json({ token: true });
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
