package com.htcompany.sncommon.graphql.pagination;

import graphql.relay.DefaultConnection;
import graphql.relay.Edge;
import graphql.relay.PageInfo;
import java.util.List;

public class AdvancedConnection<T> extends DefaultConnection<T> {

    private final int totalCount;

    public AdvancedConnection(List<Edge<T>> edges, PageInfo pageInfo, int totalCount) {
        super(edges, pageInfo);
        this.totalCount = totalCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    @Override
    public String toString() {
        return "AdvancedConnection{" +
            "edges=" + this.getEdges() +
            ", pageInfo=" + this.getPageInfo() +
            ", totalCount=" + totalCount +
            '}';
    }
}
