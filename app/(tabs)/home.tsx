import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwritefrom from '@/lib/useAppwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
const Home = () => {

    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPost } = useAppwrite(getLatestPosts);

    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = async () => {
        setRefreshing(true);
        // recall videos -> if any new videos appeared
        await refetch();
        setRefreshing(false);
    }

    // console.log(posts)
    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                // data={[]}
                keyExtractor={(item: any) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='justify-between items-start
                        flex-row mb-6
                        '>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome Back
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    {user?.username}
                                </Text>
                            </View>

                            <View className='mt-1.5'>
                                <Image
                                    resizeMode='contain'
                                    className='w-9 h-10'
                                    source={images.logoSmall} />
                            </View>
                        </View>
                        <SearchInput initialQuery={''} />

                        <View className='w-full flex 1 pt-5 pb-8'>
                            <Text className='text-gray-100 text-lg font-pregular mb-3'>
                                Lastest Video
                            </Text>

                            <Trending
                                posts={latestPost ?? []}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='Be the first one to upload a video'
                    />
                )}
                refreshControl={<RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing} />}
            />
        </SafeAreaView>
    )
}

export default Home