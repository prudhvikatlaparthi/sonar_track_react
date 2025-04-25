import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/app/utils/colors';
import ProjectItem from './project_item';

type ProjectPros = {
    aiCodeAssurance: string;
    containsAiCode: boolean;
    isAiCodeFixEnabled: boolean;
    isFavorite: boolean;
    key: string;
    name: string;
    visibility: string;
}

interface GroupProjectItemProps {
    project: ProjectPros;
}

const GroupProjectItem = ({ name }) => {
    return (
        <View style={{
            flex: 1,
            width: '100%',
            height: 100,
            backgroundColor: Colors.colorPrimaryLight,
            borderRadius: 10,
            padding: 10,
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                color: Colors.colorWhite,
             letterSpacing: 1, fontSize: 14,
                textAlign: 'center',
                fontFamily:'mont-semi-bold',
            }} numberOfLines={2}>
                {name}</Text>

        </View>
    )
}

export default GroupProjectItem