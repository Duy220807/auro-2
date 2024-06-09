import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields')
        }
        setIsSubmitting(true)
        try {
            await signIn(form.email, form.password,);
            // set it to global state

            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);

            router.replace('/home')
        } catch (error) {
            //@ts-ignore
            Alert.alert('Error', error.message)
        }
        finally {
            setIsSubmitting(false)
        }
    }
    return (

        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
                    <Image
                        source={images.logo}
                        resizeMode='contain' className='w-[115px] h-[35px]'
                    />
                    <Text className='text-2xl text-white
                    text-semibold mt-10 font-psemibold'>Login to Aora</Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: any) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address' placeholder={''} />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: any) => setForm({ ...form, password: e })}
                        otherStyles='mt-7' placeholder={''} />

                    <CustomButton
                        title={'Sign In'}
                        handlePress={submit}
                        containerStyles={'mt-7'}
                        isLoading={isSubmitting} textStyles={''} />

                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100
                            font-pregular'>
                            Dont't have account?
                        </Text>
                        <Link
                            className='text-lg font-psemibold text-secondary'
                            href={'/sign-up'}>Sign up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn