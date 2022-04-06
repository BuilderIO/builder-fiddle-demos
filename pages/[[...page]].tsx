import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../components/FlexGapExplorer";

builder.init("63f829e0e7a44824a11461f3037b38ed");

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
    omit: "data.blocks",
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: "blocking",
  };
}

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isLive = !Builder.isEditing && !Builder.isPreviewing;
  // if (!page && isLive) {
  //   return (
  //     <>
  //       <Head>
  //         <meta name="robots" content="noindex" />
  //         <meta name="title"></meta>
  //       </Head>
  //       <div>
  //         <DefaultErrorPage statusCode={404} />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BuilderComponent model="page" content={page} />
    </div>
  );
}
