import { GetStaticData, h, PageProps, useEffect, useRef } from "../deps.ts";
import { Header } from "../components/Header.tsx";

interface Data {
  html: string;
}

function IgnoringRulesPage(props: PageProps<Data>) {
  const ref = useRef<HTMLDivElement | undefined>();

  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll("pre code").forEach((block) => {
        // @ts-expect-error because typescript is not aware of hljs
        hljs.highlightBlock(block);
      });
    }
  }, [ref]);

  return (
    <div class="mx-auto max-w-screen-lg px-6 sm:px-6 md:px-8">
      <Header />
      <main
        dangerouslySetInnerHTML={{ __html: props.data.html }}
        ref={ref}
        class="prose my-8"
      />
    </div>
  );
}

export const getStaticData = async (): Promise<GetStaticData<Data>> => {
  const raw = await Deno.readTextFile("./public/ignoring-rules.md");

  const { mdParse } = await import("../ssr_deps.ts");

  const html = mdParse(raw).parsed;

  return {
    data: {
      html,
    },
  };
};

export default IgnoringRulesPage;
