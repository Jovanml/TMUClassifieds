// Hooks
import useFilterModal from "../../hooks/useFilterModal";

// Components
import Modal from "./Modal";

const FilterModal = () => {
  const filterModal = useFilterModal();

  return (
    <Modal
      isOpen={filterModal.isOpen}
      onClose={filterModal.onClose}
      onSubmit={filterModal.onSubmit}
      title='Filters'
      actionLabel={'Show'}
    />
  );
}

export default FilterModal;