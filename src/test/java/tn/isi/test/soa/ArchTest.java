package tn.isi.test.soa;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("tn.isi.test.soa");

        noClasses()
            .that()
                .resideInAnyPackage("tn.isi.test.soa.service..")
            .or()
                .resideInAnyPackage("tn.isi.test.soa.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..tn.isi.test.soa.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
