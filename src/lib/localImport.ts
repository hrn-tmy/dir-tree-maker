const EXCLUDED = new Set([
  '.git', 'node_modules', '.next', 'dist', 'build', '__pycache__', '.DS_Store',
])

export async function readDirectoryAsText(
  dirHandle: FileSystemDirectoryHandle,
  depth = 0,
): Promise<string> {
  const dirs: FileSystemDirectoryHandle[] = []
  const files: FileSystemFileHandle[] = []

  for await (const entry of dirHandle.values()) {
    if (EXCLUDED.has(entry.name)) continue
    if (entry.kind === 'directory') {
      dirs.push(entry as FileSystemDirectoryHandle)
    } else {
      files.push(entry as FileSystemFileHandle)
    }
  }

  dirs.sort((a, b) => a.name.localeCompare(b.name))
  files.sort((a, b) => a.name.localeCompare(b.name))

  const indent = '  '.repeat(depth)
  const lines: string[] = []

  for (const dir of dirs) {
    lines.push(indent + dir.name)
    const children = await readDirectoryAsText(dir, depth + 1)
    if (children) lines.push(children)
  }

  for (const file of files) {
    lines.push(indent + file.name)
  }

  return lines.join('\n')
}
