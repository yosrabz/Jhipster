package tn.isi.test.soa.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tn.isi.test.soa.web.rest.TestUtil;

public class PageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Page.class);
        Page page1 = new Page();
        page1.setId(1L);
        Page page2 = new Page();
        page2.setId(page1.getId());
        assertThat(page1).isEqualTo(page2);
        page2.setId(2L);
        assertThat(page1).isNotEqualTo(page2);
        page1.setId(null);
        assertThat(page1).isNotEqualTo(page2);
    }
}
