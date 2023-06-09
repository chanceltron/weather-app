type IProps = {
  degreeTypeCelsius: boolean;
  setDegreeType: (a: boolean) => void;
};

export const DegreeToggle = ({ degreeTypeCelsius, setDegreeType }: IProps) => {
  return (
    <button
      onClick={() => setDegreeType(!degreeTypeCelsius)}
      className={`p-1 flex justify-between items-center outline outline-1 rounded-full text-white text-2xl font-normal gap-2 transition-all ${
        degreeTypeCelsius ? 'bg-blue-600' : 'bg-orange-400'
      }`}>
      <span
        className={`rounded-full w-8 h-8 bg-gray-200 transition-all ${
          !degreeTypeCelsius && 'translate-x-8'
        }`}
      />
      <span className={`${!degreeTypeCelsius && '-translate-x-10'}`}>
        {degreeTypeCelsius ? '°C' : '°F'}
      </span>
    </button>
  );
};
