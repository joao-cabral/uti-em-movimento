import type { StepOption } from "../types";
import { CheckIcon } from "./ui";

export function OptionGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: StepOption[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="answer-grid" role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={selected ? "selected" : ""}
            onClick={() => onChange(opt.id)}
          >
            <CheckIcon checked={selected} />
            <span>
              <strong>{opt.label}</strong>
              {opt.hint && <em>{opt.hint}</em>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function CheckGroup({
  name,
  options,
  values,
  exclusiveId,
  onChange,
}: {
  name: string;
  options: StepOption[];
  values: string[];
  exclusiveId?: string;
  onChange: (ids: string[]) => void;
}) {
  const toggle = (id: string) => {
    const has = values.includes(id);
    if (has) {
      onChange(values.filter((v) => v !== id));
      return;
    }
    if (exclusiveId && id === exclusiveId) {
      onChange([id]);
      return;
    }
    const cleaned = exclusiveId
      ? values.filter((v) => v !== exclusiveId)
      : values;
    onChange([...cleaned, id]);
  };

  return (
    <div className="answer-grid checks" role="group" aria-label={name}>
      {options.map((opt) => {
        const selected = values.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            role="checkbox"
            aria-checked={selected}
            className={selected ? "selected" : ""}
            onClick={() => toggle(opt.id)}
          >
            <CheckIcon checked={selected} />
            <span>
              <strong>{opt.label}</strong>
              {opt.hint && <em>{opt.hint}</em>}
              {opt.special && (
                <span className="special-chip" role="note">
                  ⚠ {opt.special}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
