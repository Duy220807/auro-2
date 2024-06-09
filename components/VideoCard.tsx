import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'

//@ts-ignore
const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)
    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg
                        border border-secondary justify-center items-center p-0.5'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white font-semibold text-sm'
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text className='text-sx text-gray-100 font-pregular'>{username}</Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <Image
                        source={icons.menu} className='w-5 h-5' resizeMode='contain'
                    />
                </View>
            </View>
            {play ? (
                <Video
                    className='w-full h-60 rounded-xl mt-3'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        //@ts-ignore
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                    source={{
                        uri: video
                    }}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => setPlay(true)}
                    activeOpacity={0.7}
                    className='w-full h-60 rounded-xl mt-3
                relative justify-center items-center'>
                    <Image
                        source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl mt-3'
                        resizeMode='cover'
                    />
                    <Image
                        resizeMode='contain'
                        source={icons.play} className='w-12 h-12 absolute' />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard