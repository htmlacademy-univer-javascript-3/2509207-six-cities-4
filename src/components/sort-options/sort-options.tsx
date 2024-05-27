import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { setSortType } from '../../store/action';
import { SortType } from './sort-types';

const sortStrategyLabels = {
  [SortType.Popular]: 'Popular',
  [SortType.PriceAsc]: 'Price: low to high',
  [SortType.PriceDesc]: 'Price: high to low',
  [SortType.Rating]: 'Top rated first',
};

const SortOption = ({ strategy, currentStrategy, onSelect, closeForm }: { strategy: SortType; currentStrategy: SortType; onSelect: (type: SortType) => void; closeForm: () => void }) => (
  <li
    className={`places__option ${strategy === currentStrategy ? 'places__option--active' : ''}`}
    tabIndex={0}
    onClick={() => {
      onSelect(strategy);
      closeForm();
    }}
  >
    {sortStrategyLabels[strategy]}
  </li>
);

export default function SortOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const currentSortStrategy = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const handleSortStrategyChange = (strategy: SortType) => {
    dispatch(setSortType(strategy));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
        {sortStrategyLabels[currentSortStrategy]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortType).map((strategy) => (
            <SortOption
              key={strategy}
              strategy={strategy}
              currentStrategy={currentSortStrategy}
              onSelect={handleSortStrategyChange}
              closeForm={() => setIsOpen(false)}
            />
          ))}
        </ul>
      )}
    </form>
  );
}
