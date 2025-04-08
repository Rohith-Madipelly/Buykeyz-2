import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIconActive(props) {
  return (
    <Svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4 23.25V11.531L1.75 13.25l-1.5-2L14 .75l13.75 10.5-1.5 1.969L24 11.53V23.25H4zm2.5-2.5h15V9.625L14 3.906 6.5 9.625V20.75z"
        fill="#4A3AFF"
      />
    </Svg>
  )
}

export default HomeIconActive
