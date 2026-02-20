import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../../constants/Colors';
import { useCartStore } from '../../store/cart';
import { Check, Plus } from 'lucide-react-native';

interface Product {
    id: string;
    name: string;
    final_price: string; // API string
    image_url: string;
    stock_status?: string;
}

interface Props {
    product: Product;
    onPress: () => void;
}

export const ProductCard = ({ product, onPress }: Props) => {
    const { addItem, items } = useCartStore();
    const price = Number(product.final_price);
    const isOut = product.stock_status === 'OUT';
    const inCart = items.find(i => i.id === String(product.id));

    const handleAdd = () => {
        if (isOut) return;
        addItem({
            id: String(product.id),
            name: product.name,
            price,
            image: product.image_url,
            quantity: 1
        });
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image_url }}
                    style={styles.image}
                    contentFit="contain"
                    transition={200}
                />
                {isOut && <View style={styles.badge}><Text style={styles.badgeText}>OUT</Text></View>}
            </View>

            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>₹{price.toFixed(2)}</Text>

                <TouchableOpacity
                    style={[styles.addButton, isOut && styles.disabledButton, inCart && styles.addedButton]}
                    onPress={handleAdd}
                    disabled={isOut}
                >
                    {inCart ? (
                        <Check size={16} color="white" />
                    ) : (
                        <Plus size={16} color={isOut ? '#999' : 'white'} />
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 12,
        marginRight: 10,
        width: 160, // Fixed width for horizontal list or grid item
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 140,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: '80%',
        height: '80%',
    },
    badge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: Colors.status.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        padding: 10,
    },
    name: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 4,
        height: 36, // 2 lines approx
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    disabledButton: {
        backgroundColor: '#EEE',
    },
    addedButton: {
        backgroundColor: Colors.status.success,
    },
});
