import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EditIconPen(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.321 1.806a3.179 3.179 0 00-4.495 0l-1.993 1.993c.078.156.162.32.252.492.604 1.148 1.453 2.511 2.47 3.529 1.018 1.017 2.38 1.866 3.53 2.47.17.09.335.174.491.252l1.993-1.993a3.179 3.179 0 000-4.495l-2.248-2.248zm-1.277 10.268c-1.212-.645-2.743-1.592-3.947-2.796-1.204-1.204-2.151-2.735-2.796-3.947l-7.836 7.836a3.179 3.179 0 00-.9 1.799l-.674 4.72a1.59 1.59 0 001.798 1.798l4.72-.675a3.178 3.178 0 001.799-.899l7.836-7.836z"
        fill="#2F2F2F"
      />
    </Svg>
  )
}

export default EditIconPen
