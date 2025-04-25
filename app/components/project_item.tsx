import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/app/utils/colors';

const ProjectItem = ({name, analysisDate}: {name: string; analysisDate: string}) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{
                    backgroundColor: Colors.colorPrimaryLight,
                    width: 50, height: 50, borderRadius: 25,

                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: Colors.colorWhite, fontSize: 14,
                        fontWeight: 'bold', textAlign: 'center'
                    }}>
                        ABC</Text>

                </View>
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10, color: Colors.colorPrimaryDark }}>{name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10, color: Colors.colorPrimaryDark }}>Last Analysis:{analysisDate}</Text>
                </View>
            </View>
            <View
                style={{
                    height: 1, // Height for horizontal divider
                    backgroundColor: Colors.colorDisable,
                    marginTop: 10,
                    marginHorizontal: 15, // Add spacing around the divider
                }}
            ></View>
        </View>
    )
}

export default ProjectItem