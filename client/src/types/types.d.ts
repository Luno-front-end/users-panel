declare module "*.scss";
declare module "cyrillic-to-translit-js" {
  interface CyrillicToTranslit {
    transform(str: string): string;
  }

  const CyrillicToTranslit: {
    new (): CyrillicToTranslit;
  };

  export default CyrillicToTranslit;
}
