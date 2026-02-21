import { useMemo } from 'react';
import type { TreeNode } from '@/src/schemas/visualizerData';

export interface TreeStep {
    id: string;
    node: TreeNode;
    depth: number;
    path: string[]; // Array of terms leading to this node
}

/**
 * Flattens a TreeVisualizer data structure into a linear sequence of steps.
 * Uses a pre-order traversal (DFS) so the animation flows outward from the root.
 */
export function useTreeTimeline(root: TreeNode | undefined | null): TreeStep[] {
    return useMemo(() => {
        if (!root) return [];

        const steps: TreeStep[] = [];

        function traverse(node: TreeNode, depth: number, currentPath: string[]) {
            // Create a pseudo-unique ID for React keys
            const id = `${node.term}-${node.language}-${depth}-${steps.length}`;
            const newPath = [...currentPath, node.term];

            steps.push({
                id,
                node,
                depth,
                path: newPath
            });

            if (node.children && node.children.length > 0) {
                node.children.forEach(child => {
                    traverse(child, depth + 1, newPath);
                });
            }
        }

        traverse(root, 0, []);

        return steps;
    }, [root]);
}
