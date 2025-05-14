import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const foodData = [
  { id: 1, name: "��������", category: "�����", price: 260, image: "cake.jpg" },
  { id: 2, name: "�������� ����", category: "�����", price: 300, image: "classic_cake.jpg" },
  { id: 3, name: "���������-��������� ������� ����", category: "�����", price: 350, image: "mysscake1.jpg" },
  { id: 4, name: "�������-��������� ������� ����", category: "�����", price: 350, image: "mysscake2.jpg" },
  { id: 5, name: "�������� ������", category: "������", price: 65, image: "eclair1.jpg" },
  { id: 6, name: "������ ������", category: "������", price: 65, image: "eclair2.jpg" },
  { id: 7, name: "���������� �������", category: "�������", price: 110, image: "croasan1.jpg" },
  { id: 8, name: "���������� �������", category: "�������", price: 120, image: "croasan2.jpg" },
  { id: 9, name: "��������� �������", category: "�������", price: 90, image: "croasan3.jpg" },
  { id: 10, name: "Գ������� ��������", category: "�������", price: 120, image: "macarons1.jpg" },
  { id: 11, name: "������� ��������", category: "�������", price: 110, image: "macarons2.jpg" },
  { id: 12, name: "�������� ��������", category: "�������", price: 140, image: "macarons3.jpg" },
  { id: 13, name: "׳�����", category: "�������", price: 250, image: "cheesecake.jpg" },
  { id: 14, name: "ҳ�����", category: "�������", price: 280, image: "tiramisu.jpg" },
  { id: 15, name: "���������� ������-���", category: "������", price: 50, image: "caramelcookie.jpg" },
  { id: 16, name: "����� ������-���", category: "������", price: 50, image: "berrycookie.jpg" },
  { id: 17, name: "��������� ������-���", category: "������", price: 55, image: "chocoladcookie.jpg" },
  { id: 18, name: "�����", category: "����", price: 50, image: "cocoa.jpg" },
  { id: 19, name: "����� � ����", category: "����", price: 80, image: "latte.jpg" },
  { id: 20, name: "�����-����", category: "����", price: 90, image: "matcha.jpg" },
];

export const uploadMenuData = async () => {
  try {
    for (const item of foodData) {
      const itemRef = doc(db, "menu", String(item.id)); 
      await setDoc(itemRef, {
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
      }, { merge: true }); 
      console.log(`Uploaded/Updated: ${item.name}`);
    }
    console.log("Menu data uploaded without duplicates.");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

export default uploadMenuData;
