import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,NbSortDirection, NbSortRequest } from '@nebular/theme';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}
interface FSEntry {
  name: string;
  status: string;
  condition: string;
  reaction: string;
  childEntries?: FSEntry[];
  expanded?: boolean;
}
@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css']
})
export class ClusterDetailsComponent {

  customColumn = 'name';
  defaultColumns = [ 'status', 'condition', 'reaction' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  source: NbTreeGridDataSource<FSEntry>;

  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.source = dataSourceBuilder.create(this.data, getters);
  }

  private data: FSEntry[] = [
    {
      name: 'Your application 1', status: '', condition: '', reaction: '', expanded: true,
      childEntries: [
        { name: 'Njinx', status: 'active', condition: '', reaction: '', expanded: true,childEntries: [
            { name: 'High CPU usage', status: 'active', condition: 'AVG(CPU) 80', reaction: 'NOTIFICATION'},
            { name: 'High Mem usage', status: 'active', condition: 'LAST(MEM) > 0.8', reaction: 'ROLLOUT' },
            { name: 'Reaction 3', status: 'active', condition: 'LAST(REP_NUMBER) 20', reaction: 'CORDON'},
          ],},
        { name: 'Red Hat', status: 'active', condition: '', reaction: '', expanded: true,childEntries: [
            { name: 'High CPU usage', status: 'active', condition: 'AVG(CPU) 80', reaction: 'NOTIFICATION'},
            { name: 'Reaction 2', status: 'disabled', condition: 'LAST(MEM) > 0.8', reaction: 'ROLLOUT' },
            { name: 'Reaction 3', status: 'active', condition: 'LAST(REP_NUMBER) 20', reaction: 'CORDON'},
          ], },
        {
          name: 'Mysql', status: 'disabled', condition: '', reaction: '', expanded: true,
          childEntries: [
            { name: 'High CPU usage', status: 'disabled', condition: 'LAST(REP_NUMBER) 10', reaction: 'CORDON'},
            { name: 'Reaction 2', status: 'disabled', condition: 'LAST(REP_NUMBER) 15', reaction: 'CORDON' },
            { name: 'Reaction 3', status: 'disabled', condition: 'LAST(REP_NUMBER) 20', reaction: 'CORDON'},
          ],
        },
      ],
    },
  ];
}
