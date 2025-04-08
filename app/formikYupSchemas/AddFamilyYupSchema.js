import * as Yup from "yup";


const AddFamilyYupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"), // Required field
    relationship: Yup.string().required("Relationship is required"), // Required field
    isPhotoRequired: Yup.string().required("This field is required"), // Make sure the field is defined, if needed

    photo: Yup.mixed().when('isPhotoRequired', ([isPhotoRequired], schema) => {
        if (isPhotoRequired === "true")
            return schema.required('File is required')
                .test(
                    'fileSize',
                    'File too large Image should not be more then 5 mb',
                    value => {
                        console.log("ddd", value.fileSize)
                        return value && value.fileSize <= 1024 * 1024 * 5 // 10MB limit
                    }
                )
                .test(
                    'fileType',
                    'Unsupported file format Upload Only pdf format less than 10mb',
                    value => value && value.type == 'image'
                )

        return schema
    }),

    family_member_id: Yup.mixed().when('isPhotoRequired', ([isPhotoRequired], schema) => {
        if (isPhotoRequired === "false") {
            return schema.required("family_member_id field is required")
        }
        return schema
    })
    // family_member_id: Yup.string().when('isPhotoRequired', ([isPhotoRequired], schema) => {
    //     if (isPhotoRequired === "false") {
    //         return schema
    //             .required("family_member_id field is required")
    //     }
    //     return schema
    // }),
});
export { AddFamilyYupSchema }

// .oneOf(["Own", "Lease"], "Ownership must be 'Own' or 'Lease'")




// reason: Yup.string().when('practiseRegularly', ([practiseRegularly], schema) => {
//     if (practiseRegularly === "yes")
//         return schema.required("Required field")
//     return
// }),