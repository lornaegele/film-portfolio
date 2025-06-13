"use client";

import { headingFont } from "../lib/font";

const Footer = () => {
  return (
    <div
      className={`flex justify-center items-center ${headingFont.className} pb-6 pt-4`}
    >
      <div className="w-[140px]">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path
              id="circlePath"
              d="
                M 50,50
                m -30,0
                a 30,30 0 1,1 60,0
                a 30,30 0 1,1 -60,0
              "
            />
          </defs>
          <g>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="10s"
              repeatCount="indefinite"
            />
            <text fontSize="11.5" fill="black">
              <textPath href="#circlePath">
                © 2025 made by Lorenz Naegele
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Footer;
