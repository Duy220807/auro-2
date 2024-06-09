import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {
    const { user } = useGlobalContext();
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    })

    const openPicker = async (selectType: string) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images
                : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            {
                if (selectType === 'image') {
                    //@ts-ignore
                    setForm({ ...form, thumbnail: result.assets[0] })
                }
                if (selectType === 'video') {
                    //@ts-ignore
                    setForm({ ...form, video: result.assets[0] })
                }
            }
        }

    }

    const submit = async () => {
        if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
            return Alert.alert('Please fill in all the fields')
        }

        setUploading(true)

        try {

            await createVideo({
                ...form, userId: user.$id,

            })

            Alert.alert('Success', 'Post uploaded successfully')
            router.push('/home')
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            })
            setUploading(false);
        }
    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className='px-4 my-6'>
                <Text className='text-2xl text-white font-psemibold'>
                    Upload Video
                </Text>
                <FormField
                    title={'Video Title'}
                    value={form.title}
                    placeholder={'Give your video a catch title...'}
                    handleChangeText={(e: any) => {
                        setForm({ ...form, title: e })
                    }}
                    otherStyles='mt-10'
                />

                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload Video
                    </Text>
                    <TouchableOpacity onPress={() => openPicker('video')}>
                        {form.video ? (
                            <Video
                                source={{ uri: form.video.uri }}
                                className='w-full h-64 rounded-2xl'
                                resizeMode={ResizeMode.COVER}
                            />
                        ) : (
                            <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                                <View className='w-14 h14 border border-dashed border-secondary-100 justify-center items-center'>
                                    <Image
                                        className='w-1/2'
                                        source={icons.upload}
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Thumbnail Image
                    </Text>
                    <TouchableOpacity onPress={() => openPicker('image')}>
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                resizeMode='cover'
                                className='w-full h-64 rounded-2xl'
                            />
                        ) : (
                            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center
                            border-black-200 flex-row space-x-2
                            '>
                                <Image
                                    className='w-5 h-5'
                                    source={icons.upload}
                                    resizeMode='contain'
                                />
                                <Text className='text-sm text-gray-100 font-pmedium'>
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <FormField
                    title={'Al Prompt Title'}
                    value={form.prompt}
                    placeholder={'The prompt you use to create this video'}
                    handleChangeText={(e: any) => {
                        setForm({ ...form, prompt: e })
                    }}
                    otherStyles='mt-7'
                />
                <CustomButton
                    title={'Submit & Publish'}
                    handlePress={submit}
                    containerStyles={'mt-7'}
                    isLoading={uploading} textStyles={''} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create