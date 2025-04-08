import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NextIcon(props) {
  return (
    <Svg
      width={16}
      height={8}
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.817 3.543L12.55.188a.611.611 0 00-.884.002.66.66 0 00.003.912l2.192 2.253H.625A.635.635 0 000 4c0 .356.28.645.625.645h13.236L11.67 6.898a.66.66 0 00-.003.912c.244.253.64.253.884.002l3.266-3.355a.661.661 0 000-.914z"
        fill="#6D3AFF"
      />
    </Svg>
  )
}

export default NextIcon
