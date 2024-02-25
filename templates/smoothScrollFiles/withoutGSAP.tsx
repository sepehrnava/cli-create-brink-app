import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

interface IProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    smoothScrollbar: Scrollbar | null;
  }
}

export default function Index({ children }: IProps) {
  const { locale, pathname, asPath } = useRouter();

  const main = useRef(null);
  const smoother = useRef<Scrollbar | null>(null);

  useLayoutEffect(() => {
    if (main.current && window.innerWidth > 768) {
      smoother.current = Scrollbar.init(main.current, {
        damping: 0.1,
        delegateTo: document.getElementById("wrapper"),
      });

      smoother.current.setPosition(0, 0);
      smoother.current.track.xAxis.element.remove();
      window.smoothScrollbar = smoother.current;
    }
  }, []);

  useEffect(() => {
    smoother.current?.scrollTo(0, 0);
  }, [asPath]);

  return (
    <>
      <div id="wrapper">
        <main
          ref={main}
          className={`text-primary w-full overflow-hidden md:h-screen`}
          id="smooth-wrapper"
        >
          <div id="smooth-content" className="max-w-[100vw] overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
