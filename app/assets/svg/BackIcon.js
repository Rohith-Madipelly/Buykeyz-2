import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function BackIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={24} height={24} rx={12} fill="#fff" fillOpacity={0.12} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.219 6.164a.75.75 0 01.117 1.055L10.71 11.75l3.626 4.532a.75.75 0 11-1.172.936l-4-5a.75.75 0 010-.937l4-5a.75.75 0 011.055-.117z"
        fill="#fff"
      />
    </Svg>
  )
}

export default BackIcon
