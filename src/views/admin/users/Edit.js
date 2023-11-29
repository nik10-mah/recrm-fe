import { CloseIcon, PhoneIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSchema } from 'schema';
import { getApi, putApi } from 'services/api';


const Edit = (props) => {
    const { onClose, isOpen, fetchData, size } = props

    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        role: '',
        bio: '',
        experience: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        onSubmit: (values, { resetForm }) => {
            EditData();
            resetForm();
        },
    });
    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue } = formik

    const [isLoding, setIsLoding] = useState(false)

    const EditData = async () => {
        try {
            setIsLoding(true)
            let response = await putApi(`api/user/edit/${param.id}`, values)
            if (response && response.status === 200) {
                props.onClose();
                fetchData()
            } else {
                toast.error(response.response.data?.message)
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            setIsLoding(false)
        }
    };

    const param = useParams()
    const fetcEdithData = async () => {
        let response = await getApi('api/user/view/', param.id)
        setFieldValue('firstName', response.data?.firstName)
        setFieldValue('lastName', response.data?.lastName)
        setFieldValue('username', response.data?.username)
        setFieldValue('phoneNumber', response.data?.phoneNumber)
        setFieldValue('role', response.data?.role)
        setFieldValue('bio', response.data?.bio)
        setFieldValue('experience', response.data?.experience)
    }

    useEffect(() => {
        fetcEdithData()
    }, [props])


    return (
        <div>
        <Drawer isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader justifyContent="space-between" display="flex">
            Edit User
            <IconButton onClick={() => onClose(false)} icon={<CloseIcon />} />
          </DrawerHeader>
          <DrawerBody>

                    <Grid templateColumns="repeat(12, 1fr)" gap={3}>

                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                First Name
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                onChange={handleChange} onBlur={handleBlur}
                                value={values.firstName}
                                name="firstName"
                                placeholder='firstName'
                                fontWeight='500'
                                borderColor={errors.firstName && touched.firstName ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}> {errors.firstName && touched.firstName && errors.firstName}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Last Name
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                onChange={handleChange} onBlur={handleBlur}
                                value={values.lastName}
                                name="lastName"
                                placeholder='Last Name'
                                fontWeight='500'
                                borderColor={errors.lastName && touched.lastName ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}> {errors.lastName && touched.lastName && errors.lastName}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Email
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                type='email'
                                onChange={handleChange} onBlur={handleBlur}
                                value={values.username}
                                name="username"
                                placeholder='Email Address'
                                fontWeight='500'
                                borderColor={errors.username && touched.username ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}> {errors.username && touched.username && errors.username}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  mb="4px"
                >
                  Role
                </FormLabel>
                <Select
                  value={values.role}
                  name="role"
                  onChange={handleChange}
                  mb={errors.role && touched.role ? undefined : "10px"}
                  fontWeight="500"
                  borderColor={errors.role && touched.role ? "red.300" : null}
                  placeholder="Select Role"
                >
                  <option value="agent">Agent</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
                {errors.role && touched.role && (
                  <Text mb="10px" color={"red"}>
                    {" "}
                    {errors.role}
                  </Text>
                )}
              </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Phone Number<Text color={"red"}>*</Text>
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<PhoneIcon color="gray.300" borderRadius="16px" />}
                                />
                                <Input type="tel"
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.phoneNumber}
                                    name="phoneNumber"
                                    fontWeight='500'
                                    borderColor={errors.phoneNumber && touched.phoneNumber ? "red.300" : null}
                                    placeholder="Phone number" borderRadius="16px" />
                            </InputGroup>
                            <Text mb='10px' color={'red'}>{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12 }}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  mb="4px"
                >
                  Bio
                </FormLabel>
                <Textarea
                  fontSize="sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  value={values.bio}
                  name="bio"
                  placeholder="Bio"
                  fontWeight="500"
                  rows={8}
                  borderColor={
                    errors.bio && touched.bio ? "red.300" : null
                  }
                />
                <Text mb="10px" color={"red"}>
                  {" "}
                  {errors.bio && touched.bio && errors.bio}
                </Text>
              </GridItem>
              <GridItem colSpan={{ base: 12 }}>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  mb="4px"
                >
                  Experience
                </FormLabel>
                <Textarea
                  fontSize="sm"
                  size="lg"
                  rows={8}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.experience}
                  name="experience"
                  placeholder="Experience"
                  fontWeight="500"
                  borderColor={
                    errors.experience && touched.experience ? "red.300" : null
                  }
                />
                <Text mb="10px" color={"red"}>
                  {" "}
                  {errors.experience && touched.experience && errors.experience}
                </Text>
              </GridItem>
                    </Grid>


                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='brand' disabled={isLoding ? true : false} onClick={handleSubmit}>{isLoding ? <Spinner /> : 'Update Data'}</Button>
                        <Button onClick={() => onClose(false)}>Close</Button>
                    </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
    )
}

export default Edit
