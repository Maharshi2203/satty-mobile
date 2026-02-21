import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';
import { Receipt, Clock, ChevronRight } from 'lucide-react-native';

const ORDERS = [
    { id: '1', number: '#SAT-8821', status: 'On the way', date: '21 Feb, 11:30 AM', total: '₹1,240', items: 3 },
    { id: '2', number: '#SAT-8752', status: 'Delivered', date: '19 Feb, 08:15 PM', total: '₹850', items: 2 },
];

export default function OrdersScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.title}>Your Orders</Text>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>History</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={ORDERS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <View style={styles.orderIdRow}>
                                <Receipt size={18} color={Colors.primary} />
                                <Text style={styles.orderId}>{item.number}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: item.status === 'On the way' ? 'rgba(229, 9, 58, 0.1)' : 'rgba(39, 174, 96, 0.1)' }]}>
                                <Text style={[styles.statusText, { color: item.status === 'On the way' ? Colors.primary : Colors.status.success }]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.orderBody}>
                            <Text style={styles.orderDate}>{item.date}</Text>
                            <Text style={styles.orderInfo}>{item.items} items • {item.total}</Text>
                        </View>

                        <View style={styles.orderFooter}>
                            <TouchableOpacity style={styles.reorderBtn}>
                                <Text style={styles.reorderText}>Reorder</Text>
                            </TouchableOpacity>
                            <View style={styles.trackBtn}>
                                <Text style={styles.trackText}>Track Order</Text>
                                <ChevronRight size={16} color={Colors.primary} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { padding: 20, paddingTop: 10 },
    title: { fontSize: 24, fontWeight: 'bold', color: Colors.text.primary },
    tabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
    tab: { paddingVertical: 10, paddingHorizontal: 20, marginRight: 12, borderRadius: 25, backgroundColor: Colors.surface, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
    activeTab: { backgroundColor: Colors.primary },
    tabText: { color: Colors.text.secondary, fontWeight: '600' },
    activeTabText: { color: 'white' },
    list: { padding: 20 },
    orderCard: { backgroundColor: Colors.surface, borderRadius: 24, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    orderIdRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    orderId: { fontWeight: 'bold', color: Colors.text.primary, fontSize: 16 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
    statusText: { fontSize: 11, fontWeight: 'bold' },
    orderBody: { marginBottom: 20 },
    orderDate: { color: Colors.text.secondary, fontSize: 13, marginBottom: 4 },
    orderInfo: { color: Colors.text.primary, fontWeight: '600', fontSize: 15 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 16 },
    reorderBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12, borderWidth: 1.5, borderColor: Colors.primary },
    reorderText: { color: Colors.primary, fontWeight: 'bold', fontSize: 13 },
    trackBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    trackText: { color: Colors.primary, fontWeight: 'bold', fontSize: 13 },
});
