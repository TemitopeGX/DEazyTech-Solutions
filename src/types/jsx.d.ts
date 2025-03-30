import {
  SVGProps,
  HTMLAttributes,
  DetailedHTMLProps,
  MetaHTMLAttributes,
  ButtonHTMLAttributes,
  ImgHTMLAttributes,
  LabelHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import { IconBaseProps } from "react-icons";

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
      button: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >;
      aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      img: DetailedHTMLProps<
        ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >;
      label: DetailedHTMLProps<
        LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      >;
      input: DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      textarea: DetailedHTMLProps<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      form: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      a: DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >;
    }
  }
}

declare module "react-icons/fa" {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
    className?: string;
  }
}

declare module "formik" {
  interface FormikErrors<Values> {
    [field: string]: string | string[] | FormikErrors<any> | undefined;
  }

  interface FormikTouched<Values> {
    [field: string]: boolean | FormikTouched<any>;
  }

  interface FormikHelpers<Values> {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  }

  interface FormikProps<Values> {
    values: Values;
    errors: FormikErrors<Values>;
    touched: FormikTouched<Values>;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  }
}
