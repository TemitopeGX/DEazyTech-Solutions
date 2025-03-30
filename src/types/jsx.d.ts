import {
  SVGProps,
  HTMLAttributes,
  DetailedHTMLProps,
  MetaHTMLAttributes,
} from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // SVG elements
      svg: SVGProps<SVGSVGElement>;
      path: SVGProps<SVGPathElement>;
      circle: SVGProps<SVGCircleElement>;
      rect: SVGProps<SVGRectElement>;
      line: SVGProps<SVGLineElement>;
      polyline: SVGProps<SVGPolylineElement>;
      polygon: SVGProps<SVGPolygonElement>;

      // HTML elements
      div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      title: DetailedHTMLProps<
        HTMLAttributes<HTMLTitleElement>,
        HTMLTitleElement
      >;
      meta: DetailedHTMLProps<
        MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
      >;
      span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      h1: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h2: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h3: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      p: DetailedHTMLProps<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >;
      ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      li: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    }
  }
}
