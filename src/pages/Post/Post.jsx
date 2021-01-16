import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";
import styles from "./Post.less";
import { useParams, useLocation } from "react-router-dom";
import PostHeader from "./PostHeader";
import Image from "./components/Image/Image";
import NotFound from "../NotFound";
import Prism from "prismjs";
import { CustomHashLink } from "./components/CustomHashLink/CustomHashLink";
import Video from "./components/Video/Video";
import useScrolling from "../../hooks/useScrolling";
import Indicator from "./components/Indicator/Indicator";
import { getPost } from "../../data";

function emphasizeFirstWord(content) {
  const emphasized = `<strong class=${styles.emphasize}>$1</strong>`;
  return content.replace(/<<(.*?)>>/g, emphasized);
}

export default function Post() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const elem = document.querySelector(hash);
      elem && elem.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  const { id } = useParams();
  const containerRef = useRef();
  const post = getPost(id);
  if (!post) {
    return <NotFound />;
  }
  useEffect(() => {
    containerRef.current && Prism.highlightAllUnder(containerRef.current);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const isScrolling = useScrolling(containerRef);
  const { content, tags, time, title } = post;

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <PostHeader
          id={id}
          title={title}
          time={time}
          tags={tags}
          content={content}
        />
        <div className={styles.postContainer} ref={containerRef}>
          {content.map((paragraph, index) => (
            <span className={styles.paragraph} key={index}>
              {paragraph.title && (
                <CustomHashLink className={styles.pTitle}>
                  {paragraph.title}
                </CustomHashLink>
              )}
              {paragraph.video && <Video video={paragraph.video} />}
              {paragraph.image && <Image image={paragraph.image} figure />}
              {paragraph.text && (
                <div
                  key={index}
                  className={`${styles.content}${
                    index === 0 ? ` ${styles.contentFirst}` : ""
                  }`}
                >
                  <ReactMarkdown
                    source={
                      index === 0
                        ? emphasizeFirstWord(paragraph.text)
                        : paragraph.text
                    }
                    escapeHtml={false}
                    renderers={{
                      link: (props) => {
                        const additionalProps = props.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {};
                        return (
                          <a href={props.href} {...additionalProps}>
                            {props.children}
                          </a>
                        );
                      },
                    }}
                  />
                </div>
              )}
              {paragraph.code && (
                <div className={styles.codeContainer}>
                  <pre className="line-numbers">
                    <code className={`language-${paragraph.code.language}`}>
                      {paragraph.code.source}
                    </code>
                  </pre>
                  {paragraph.code.title && (
                    <span className={styles.codeTitle}>
                      {paragraph.code.title}
                    </span>
                  )}
                </div>
              )}
            </span>
          ))}
        </div>
        {isScrolling && (
          <button
            onClick={handleClick}
            title="Scroll to top"
            className={styles.anchor}
          >
            &uarr;
          </button>
        )}
      </article>
      <Indicator />
    </div>
  );
}
