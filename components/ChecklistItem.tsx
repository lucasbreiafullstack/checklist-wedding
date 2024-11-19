import { ChecklistItem } from '../utils/types';
import { useState } from 'react';
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

type ChecklistItemProps = {
  item: ChecklistItem;
  onRemove: (id: string) => void;
  onEdit: (id: string, updatedName: string, updatedPrice: number) => void;
  onToggleStatus: (id: string) => void;
};

const ChecklistItemComponent: React.FC<ChecklistItemProps> = ({
  item,
  onRemove,
  onEdit,
  onToggleStatus,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editPrice, setEditPrice] = useState(item.price);

  const handleEditSubmit = () => {
    onEdit(item.id, editName, editPrice);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex justify-between items-center p-4 border rounded-md ${
        item.purchased ? 'bg-olive-light' : 'bg-gray-50'
      }`}
    >
      {isEditing ? (
        <div className="flex gap-4 w-full">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(Number(e.target.value))}
            className="w-24 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleEditSubmit}
            className="px-3 py-1 bg-olive text-white rounded-md hover:bg-olive-light transition"
          >
            Salvar
          </button>
        </div>
      ) : (
        <div className="flex justify-between w-full items-center">
          <div>
            <p className="font-medium text-black">{item.name}</p>
            <p className="text-sm text-gray-600">Preço: R$ {item.price.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            {/* Alternar Status */}
            <div className="relative group">
              <button
                onClick={() => onToggleStatus(item.id)}
                className={`p-2 rounded-full hover:bg-gray-200 transition ${
                  item.purchased ? 'text-gray-600' : 'text-green-600'
                }`}
              >
                {item.purchased ? (
                  <ArrowPathIcon className="w-5 h-5" />
                ) : (
                  <CheckIcon className="w-5 h-5" />
                )}
              </button>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                {item.purchased ? 'Marcar como Pendente' : 'Marcar como Comprado'}
              </span>
            </div>

            {/* Editar */}
            <div className="relative group">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                Editar Item
              </span>
            </div>

            {/* Remover */}
            <div className="relative group">
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                Remover Item
              </span>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ChecklistItemComponent;