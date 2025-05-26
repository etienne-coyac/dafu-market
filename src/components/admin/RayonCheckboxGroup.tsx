import React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import type { CategoryType } from '../../types/categories';
import type { RayonType} from '../../types/rayons';

type Props = {
  rayon: RayonType;
  categories: CategoryType[];
  onRayonChange: (newCategories: CategoryType[]) => void;
};

const RayonCheckboxGroup: React.FC<Props> = ({ rayon, categories, onRayonChange }) => {
  const allChecked: boolean = categories.every((cat: CategoryType) => cat.checked);
  const someChecked: boolean = categories.some((cat: CategoryType) => cat.checked);

  const handleParentChange = (checked: boolean): void => {
    const updated: CategoryType[] = categories.map((cat: CategoryType) => ({
      ...cat,
      checked,
    }));
    onRayonChange(updated);
  };

  const handleChildChange = (index: number, checked: boolean): void => {
    const updated: CategoryType[] = [...categories];
    updated[index].checked = checked;
    onRayonChange(updated);
  };
  
  return (
    <Box>
      <Checkbox
        label={rayon.nomRayon}
        checked={allChecked}
        indeterminate={!allChecked && someChecked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParentChange(e.target.checked)}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 1.5,
          ml: 3,
          mt: 1,
        }}
      >
        {categories.map((cat: CategoryType, index: number) => (
          <Checkbox
            key={cat.idCategorie}
            label={cat.nomCategorie}
            checked={!!cat.checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChildChange(index, e.target.checked)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RayonCheckboxGroup;