import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function ProductsIconActive(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={30}
        height={30}
      >
        <Path fill="#D9D9D9" d="M0 0H30V30H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M6.906 26.25a2.362 2.362 0 01-1.5-.516 2.633 2.633 0 01-.906-1.328L1.312 12.844a1.246 1.246 0 01.204-1.094c.24-.333.567-.5.984-.5h5.937l5.5-8.188c.105-.166.25-.302.438-.406a1.205 1.205 0 011.188 0c.187.104.333.24.437.406l5.5 8.188h6c.417 0 .745.167.984.5.24.333.308.698.203 1.094L25.5 24.406a2.634 2.634 0 01-.906 1.328 2.362 2.362 0 01-1.5.516H6.906zm-.031-2.5h16.25l2.75-10H4.125l2.75 10zM15 21.25c.688 0 1.276-.245 1.766-.734.49-.49.734-1.078.734-1.766s-.245-1.276-.734-1.766A2.407 2.407 0 0015 16.25c-.688 0-1.276.245-1.766.734a2.407 2.407 0 00-.734 1.766c0 .688.245 1.276.734 1.766.49.49 1.079.734 1.766.734zm-3.531-10H18.5L14.969 6l-3.5 5.25z"
          fill="#4A3AFF"
        />
      </G>
    </Svg>
  )
}

export default ProductsIconActive
