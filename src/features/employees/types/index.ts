export interface UseActionType {
  isSaved: boolean;
  handleCancel: () => void;
  handleSave: () => Promise<boolean>;
  handleEdit: () => void;
  handleGlobal: () => void;
  isLoading: boolean;
  appliedGlobalSettings: boolean;
  handleOnlyGlobal: () => void;
  handleEditGlobal?: () => void;
}
