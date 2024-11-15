import { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/type";
import { useRouter } from "next/router";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResulut = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResulut();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등로된 도서들을 만나보세요."
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
