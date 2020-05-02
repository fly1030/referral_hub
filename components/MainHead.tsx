import Head from "next/head";

type Props = {
  title: string;
};
export default function MainHead(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.min.css" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}
