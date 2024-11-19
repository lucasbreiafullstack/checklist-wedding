import { useState } from 'react';

type AddItemFormProps = {
  onAddItem: (name: string, price: number) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price) {
      onAddItem(name, Number(price));
      setName('');
      setPrice('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-olive space-y-4"
    >
      <h2 className="text-xl font-bold text-olive">Adicionar Item</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nome do item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))
          }
          className="w-32 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-olive text-white rounded-md hover:bg-olive-light transition"
      >
        Adicionar Item
      </button>
    </form>
  );
};

export default AddItemForm;
