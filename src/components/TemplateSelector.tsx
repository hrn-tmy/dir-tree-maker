import { templateGroups } from '../templates'

type Props = {
  onSelect: (content: string) => void
}

export function TemplateSelector({ onSelect }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (!id) return
    const template = templateGroups
      .flatMap((g) => g.templates)
      .find((t) => t.id === id)
    if (template) onSelect(template.content)
    e.target.value = ''
  }

  return (
    <select
      defaultValue=""
      onChange={handleChange}
      className="px-2 py-1 text-xs rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 outline-none cursor-pointer transition-colors"
    >
      <option value="" disabled>テンプレートを選択...</option>
      {templateGroups.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.templates.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}
