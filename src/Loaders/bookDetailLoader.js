export const bookDetailLoader = async ({ params }) => {
  const id = params.id;

  const res = await fetch(`http://127.0.0.1:3000/api/v1/books/${id}`);

  const data = await res.json();

  return data.data.book;
};
