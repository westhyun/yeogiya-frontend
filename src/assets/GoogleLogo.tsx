import { SVGProps } from "@/types/assets";

const GoogleLogo = ({ css }: SVGProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={css}
    >
      <rect width="18" height="18" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_5_68"
            transform="translate(0 -0.0112613) scale(0.0045045)"
          />
        </pattern>
        <image
          id="image0_5_68"
          width="222"
          height="227"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default GoogleLogo;
