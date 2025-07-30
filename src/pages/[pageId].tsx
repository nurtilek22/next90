import { useEffect, useState } from 'react';
import Head from 'next/head';

// Функция для получения данных страницы через API WordPress
export async function getServerSideProps({ params }) {
  const { pageId } = params;

  // Получаем данные страницы с WordPress
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/pages/${pageId}`);
  const data = await res.json();

  return {
    props: {
      pageId: data.id,
      pageContent: data.content.rendered,
      pageTitle: data.title.rendered,
    },
  };
}

const Page = ({ pageId, pageContent, pageTitle }) => {
  const [cssUrl, setCssUrl] = useState('');

  // Логика для подбора нужного CSS файла для страницы
  useEffect(() => {
    // Формируем URL для CSS файла страницы
    const generatedCssUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/uploads/elementor/css/post-${pageId}.css`;
    setCssUrl(generatedCssUrl);
  }, [pageId]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {/* Подключаем CSS файл страницы */}
        {cssUrl && <link rel="stylesheet" href={cssUrl} />}
      </Head>

      <div>
        <h1>{pageTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    </>
  );
};

export default Page;
