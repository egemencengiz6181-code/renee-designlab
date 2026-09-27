/** [önce, vurgu, sonra] dizisini vurgulu bir başlık olarak yazar. */
export default function Hl({ parts, className = "serif-i t-lime" }) {
  const [pre, hi, post] = parts;
  return (
    <>
      {pre}
      <span className={className}>{hi}</span>
      {post}
    </>
  );
}
