import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';
import { User, MapPin, CreditCard, LogOut, ChevronRight, Settings, Bell, Shield, Heart } from 'lucide-react-native';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editBadge}>
                                <Settings size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>Jane Smith</Text>
                        <Text style={styles.email}>jane.smith@example.com</Text>
                        <TouchableOpacity style={styles.editProfileBtn}>
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <ProfileItem icon={<MapPin size={20} color={Colors.primary} />} label="Address Book" />
                    <ProfileItem icon={<CreditCard size={20} color={Colors.primary} />} label="Payment Methods" />
                    <ProfileItem icon={<Heart size={20} color={Colors.primary} />} label="Favorites" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <ProfileItem icon={<Bell size={20} color={Colors.primary} />} label="Notifications" />
                    <ProfileItem icon={<Shield size={20} color={Colors.primary} />} label="Privacy & Security" />
                </View>

                <TouchableOpacity style={styles.logoutBtn}>
                    <LogOut size={20} color={Colors.status.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Premium Delivery App v1.2.4</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function ProfileItem({ icon, label }: { icon: any, label: string }) {
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>{icon}</View>
                <Text style={styles.itemLabel}>{label}</Text>
            </View>
            <ChevronRight size={18} color={Colors.text.muted} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { padding: 30, alignItems: 'center' },
    profileInfo: { alignItems: 'center', width: '100%' },
    avatarContainer: { position: 'relative', marginBottom: 16 },
    avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: Colors.surface },
    editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.primary, width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.background },
    name: { fontSize: 24, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 4 },
    email: { fontSize: 14, color: Colors.text.secondary, marginBottom: 16 },
    editProfileBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: Colors.primary },
    editProfileText: { color: Colors.primary, fontWeight: 'bold', fontSize: 13 },
    section: { paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 16, opacity: 0.8 },
    item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.surface, padding: 16, borderRadius: 20, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5 },
    itemLeft: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(229,9,58,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    itemLabel: { fontSize: 15, color: Colors.text.primary, fontWeight: '600' },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20, padding: 18, borderRadius: 20, backgroundColor: 'rgba(255,59,59,0.05)', borderWidth: 1, borderColor: 'rgba(255,59,59,0.1)' },
    logoutText: { color: Colors.status.error, fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
    version: { textAlign: 'center', color: Colors.text.secondary, fontSize: 12, marginBottom: 40, opacity: 0.5 },
});
