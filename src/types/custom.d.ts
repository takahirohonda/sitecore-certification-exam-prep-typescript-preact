import 'preact'

declare module 'preact' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: string;
    global?: string;
  }
}

