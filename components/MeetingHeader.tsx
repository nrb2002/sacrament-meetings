interface MeetingHeaderProps {
  stake: string;
  ward: string;
}

export default function MeetingHeader({ stake, ward }: MeetingHeaderProps) {
  return (
    <section className="meeting-header mb-5 border-b border-gray-300 pb-4 text-center">
      <div className="mt-2">
        <p className="text-md font-semibold text-gray-800">The Church of</p>
        <p className="font-serif text-xl leading-tight text-gray-900 md:text-2xl">
          Jesus Christ
        </p>
        <p className="text-md font-semibold text-gray-800">
          Of Latter-day Saints
        </p>
      </div>
      <div className="mt-3">
        <p className="text-base uppercase font-semibold text-gray-800">
          {stake}
        </p>

        <p className="text-base uppercase tracking-[0.2em] text-gray-600">
          {ward}
        </p>
      </div>
    </section>
  );
}
